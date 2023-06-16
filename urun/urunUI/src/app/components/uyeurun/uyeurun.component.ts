import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urun } from 'src/app/models/Urun';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyeurun',
  templateUrl: './uyeurun.component.html',
  styleUrls: ['./uyeurun.component.css']
})
export class UyeurunComponent implements OnInit {
  urunler: Urun[];
  UyeId:  number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['UyeId']){
        this.UyeId=p['UyeId'];
        this.UyeById();
        this.UrunListeByUyeId();
      }
    });
  }
  UyeById(){
    this.apiServis.UyeById(this.UyeId).subscribe((d:Uye)=>{
      this.uye= d;
    });
  }
  UrunListeByUyeId(){
    this.apiServis.UrunListeByUyeId(this.UyeId).subscribe((d:Urun[]) =>{
      this.urunler = d;
    });    
  }

}
