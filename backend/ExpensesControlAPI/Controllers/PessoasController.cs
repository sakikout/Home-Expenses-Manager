using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using ExpensesControlAPI.Models;

namespace ExpensesControlAPI.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    [Authorize]
    public class PessoasController : ControllerBase
    {
        [HttpPost]
        public IActionResult CriarPessoa([FromBody] Pessoa pessoa)
        {
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // define the user for the person
            pessoa.UsuarioId = usuarioId;

            // check if already exists a person in user's database with the given id
            if (Database.Pessoas.Any(p => p.Id == pessoa.Id && p.UsuarioId == usuarioId)) return Conflict("Já existe uma pessoa com esse ID.");

            // add person to database
            Database.Pessoas.Add(pessoa);
            return Created($"api/pessoas/{pessoa.Id}", pessoa);
        }

        [HttpGet]
        public IActionResult ListarPessoas()
        {
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // return users' persons
            return Ok(Database.Pessoas.Where(p => p.UsuarioId == usuarioId));
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarPessoa(int id)
        {   
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // try to find the person
            var pessoa = Database.Pessoas.FirstOrDefault(p => p.Id == id && p.UsuarioId == usuarioId);
            if (pessoa == null) return NotFound("Pessoa não encontrada ou não pertence ao usuário");

            // remove all transactions realted to that person
            Database.Transacoes.RemoveAll(t => t.PessoaId == pessoa.Id);
    
            // remove that person
            Database.Pessoas.Remove(pessoa);

            return NoContent();
        }

    }

}
