using System;

namespace ExpensesControlAPI.Models
{
    public class Transacao
    {
        public string Id { get; set; }

        public string Nome { get; set; } = "";
        
        public string Descricao { get; set; } = "";

        public decimal Valor { get; set; }

        public string Tipo { get; set; } = "";

        public int PessoaId { get; set; }

        public string NomePessoa {get; set;} = "";
        
    }
}
