using System;

namespace ExpensesControlAPI.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        public string Nome { get; set; } = "";

        public int Idade { get; set; }

        public string UsuarioId { get; set; } = "";
        
    }
}
