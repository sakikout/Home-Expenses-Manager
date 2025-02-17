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
    [Route("api/totais")]
    [Authorize]
    public class TotaisPessoaController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetTotais()
        {
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            var totais = Database.Pessoas.Select(p => new TotaisPessoa
            {
                PessoaId = p.Id,
                NomePessoa = p.Nome,
                TotalReceitas = Database.Transacoes.Where(t => t.Tipo == "Receita" && t.PessoaId == p.Id).Sum(t => t.Valor),
                TotalDespesas = Database.Transacoes.Where(t => t.Tipo == "Despesa" && t.PessoaId == p.Id).Sum(t => t.Valor)
            })
            .ToList();

            var totalGeral = new
            {
                TotalReceitas = totais.Sum(t => t.TotalReceitas),
                TotalDespesas = totais.Sum(t => t.TotalDespesas),
                SaldoLiquido = totais.Sum(t => t.Saldo)
            };

            return Ok(
                new { totais, totalGeral }
            );
        }
    }

}
