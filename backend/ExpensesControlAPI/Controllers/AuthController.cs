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
        if (Database.Usuarios.Any(u => u.Email == usuario.Email)) return BadRequest("Email já cadastrado");
        
        Database.Usuarios.Add(usuario);
        return Ok("Usuário registrado com sucesso");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Usuario usuario)
    {
        var user = Database.Usuarios.FirstOrDefault(u => u.Email == usuario.Email && u.Senha == usuario.Senha);
        if (user == null) return Unauthorized("Credenciais inválidas");
        
        var token = TokenService.GenerateToken(user);
        
        return Ok(new { 
            user = user,
            token = token
        });
    }
    }
}
