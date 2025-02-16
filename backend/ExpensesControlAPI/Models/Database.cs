using System;
using System.Collections.Generic;
using ExpensesControlAPI.Models;

namespace ExpensesControlAPI
{
    public class Database
    {
            public static List<Pessoa> Pessoas = new();

            public static List<Transacao> Transacoes = new();

            public static List<Usuario> Usuarios = new();
    }
}
