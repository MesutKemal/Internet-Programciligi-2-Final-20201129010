import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit: Urun;
  islem: string;
  frm: UntypedFormGroup;
  kategoriler: Kategori[];
  jconfig: {};

  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    public frmBuild: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) { 
    this.islem = data.islem;

    if(this.islem=="ekle"){
      this.dialogBaslik= "Ürün Ekle";
      this.yeniKayit= new Urun();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik= "Ürün Düzenle"
      this.yeniKayit= data.kayit;
    }
    if(this.islem=="detay"){
      this.dialogBaslik= "Ürün Detay"
      this.yeniKayit= data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      Baslik: (this.yeniKayit.Baslik),
      Icerik: (this.yeniKayit.Icerik),
      KategoriId: (this.yeniKayit.KategoriId)
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
}
