using System.Collections.Generic;
using AspNetCoreSpa.Server.Entities;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class PostClientViewModel
    {
        public Client Client { get; set; }
        public List<string> Links { get; set; }
    }
}
