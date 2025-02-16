using System;

namespace ExpensesControlAPI.Models
{
    public class TotaisPessoa
    {
        public int PessoaId { get; set; }
        public string NomePessoa { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;
        
    }
}
