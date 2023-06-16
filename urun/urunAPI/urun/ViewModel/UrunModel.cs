using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace urun.ViewModel
{
    public class UrunModel
    {
        public int UrunId { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public string Foto { get; set; }
        public System.DateTime Tarih { get; set; }
        public int KategoriId { get; set; }
        public int UyeId { get; set; }
        public string Goruntulenme { get; set; }
        public string KategoriAdi { get; set; }
        public string UyeKadi { get; set; }
    }
}