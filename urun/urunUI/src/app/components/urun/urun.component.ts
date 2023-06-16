import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urun } from 'src/app/models/Urun';
import { Sonuc } from 'src/app/models/Sonuc';
import { Yorum } from 'src/app/models/Yorum';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css']
})
export class UrunComponent implements OnInit {
  UrunId:number;
  urun: Urun;
  yorumlar: Yorum[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['UrunId']){
        this.UrunId=p['UrunId'];
        this.UrunById();
        this.UrunYorumListe();
      }
    });
  }
  UrunById(){
    this.apiServis.UrunById(this.UrunId).subscribe((d:Urun)=>{
      this.urun = d;
      this.UrunGorulduYap();
    });
  }
  UrunGorulduYap(){
    this.urun.Goruntulenme += 1;
    this.apiServis.UrunDuzenle(this.urun).subscribe();
  }

  UrunYorumListe() {
    this.apiServis.YorumListeByurunId(this.UrunId).subscribe((d:Yorum[])=>{
      this.yorumlar = d ;
    });
  }

  YorumEkle(yorumMetni:string){
    var yorum:Yorum = new Yorum();
    var uyeId: number = parseInt(localStorage.getItem("uid"));
    yorum.UrunId=this.UrunId;
    yorum.UyeId = uyeId;
    yorum.YorumIcerik = yorumMetni;
    yorum.Tarih = new Date();

    this.apiServis.YorumEkle(yorum).subscribe((d:Sonuc) => {
      if(d.islem) {
        this.UrunYorumListe();
      }
    });

  }

}