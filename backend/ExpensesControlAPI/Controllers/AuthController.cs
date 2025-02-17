using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using ExpensesControlAPI.Models;
using ExpensesControlAPI.Services;

namespace ExpensesControlAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
    
    [HttpPost("register")]
    public IActionResult Registrar([FromBody] Usuario usuario)
    {
        //verify if user already exists
        if (Database.Usuarios.Any(u => u.Email == usuario.Email)) return BadRequest("Email já cadastrado");
        
        // add user to database
        Database.Usuarios.Add(usuario);

        // check if user was really added to the database
        var userCheck = Database.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);
        if (userCheck == null)
            return StatusCode(500, "Erro ao registrar usuário.");

        // return ok if yes
        return Ok("Usuário registrado com sucesso");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Usuario usuario)
    {   
        // check if user credentials are correct
        var user = Database.Usuarios.FirstOrDefault(u => u.Email == usuario.Email && u.Senha == usuario.Senha);
        if (user == null) return Unauthorized("Credenciais inválidas");
        
        // generate a token for the user
        var token = TokenService.GenerateToken(user);
        
        // return the token and user if everything is fine
        return Ok(new { 
            user = user,
            token = token
        });
    }
    }
}
