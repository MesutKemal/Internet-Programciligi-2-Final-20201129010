using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace urun.ViewModel
{
    public class YorumModel
    {
        public int YorumId { get; set; }
        public string YorumIcerik { get; set; }
        public int UyeId { get; set; }
        public int UrunId { get; set; }
        public System.DateTime Tarih { get; set; }
        public string UrunBaslik { get; set; }
        public string KullaniciAdi { get; set; }
    }
}