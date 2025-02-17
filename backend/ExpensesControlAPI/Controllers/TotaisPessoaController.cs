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
            // verify if the user is logged in
            var usuarioId = User.FindFirst(ClaimTypes.Email)?.Value;
            if (usuarioId == null) return Unauthorized();

            // get all the persons and sum their expenses and incomes
            var totais = Database.Pessoas.Select(p => new TotaisPessoa
            {
                PessoaId = p.Id,
                NomePessoa = p.Nome,
                TotalReceitas = Database.Transacoes.Where(t => t.Tipo == "Receita" && t.PessoaId == p.Id).Sum(t => t.Valor),
                TotalDespesas = Database.Transacoes.Where(t => t.Tipo == "Despesa" && t.PessoaId == p.Id).Sum(t => t.Valor)
            })
            .ToList();

            // get the totals of all persons and sum again to get a general overview of expenses and income
            var totalGeral = new
            {
                TotalReceitas = totais.Sum(t => t.TotalReceitas),
                TotalDespesas = totais.Sum(t => t.TotalDespesas),
                SaldoLiquido = totais.Sum(t => t.Saldo)
            };

            // return the total of each person and the general overview
            return Ok(
                new { totais, totalGeral }
            );
        }
    }

}
