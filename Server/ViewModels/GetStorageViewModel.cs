using System;
using System.Collections.Generic;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class GetStorageViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TotalCount { get; set; }

        public List<StorageDetailsViewModel> StorageDetails { get; set; }
    }
}
