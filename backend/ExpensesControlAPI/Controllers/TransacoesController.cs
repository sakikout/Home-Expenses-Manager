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
    [Route("api/transacoes")]
    [Authorize]
    public class TransacaoController : ControllerBase
    {

        [HttpPost]
        public IActionResult CriarTransacao([FromBody] Transacao transacao)
        {
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();
        
            // verify if the person exists in user's database
            var pessoa = Database.Pessoas.FirstOrDefault(p => p.Id == transacao.PessoaId && p.UsuarioId == usuarioId);
            if (pessoa == null) return BadRequest("Pessoa não encontrada ou não pertence ao usuário");

            // verify if the person is a minor
            // if the person is a minor then only expenses are accepted
            if (pessoa.Idade < 18 && transacao.Tipo == "Receita") return BadRequest("Menores de idade só podem cadastrar despesas");

            // generate an unique ID
            transacao.Id = Guid.NewGuid().ToString();

            // add to database
            Database.Transacoes.Add(transacao);
            return Created($"api/transacoes/{transacao.Id}", transacao);
        }

        [HttpGet]
        public IActionResult ListarTransacoes()
        {
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // get all user's transactions
            var transacoes = Database.Transacoes.Where(t => Database.Pessoas.Any(p => p.Id == t.PessoaId && p.UsuarioId == usuarioId));
            return Ok(transacoes);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarTransacao(int id)
        {
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // try to find the transaction
            var transacao = Database.Transacoes.FirstOrDefault(t => t.Id == id && Database.Pessoas.Any(p => p.Id == t.PessoaId && p.UsuarioId == usuarioId));
            if (transacao == null) return NotFound("Transação não encontrada ou não pertence ao usuário");

            // remove the transaction if exists
            Database.Transacoes.Remove(transacao);

            return NoContent();
        }
    }

}
