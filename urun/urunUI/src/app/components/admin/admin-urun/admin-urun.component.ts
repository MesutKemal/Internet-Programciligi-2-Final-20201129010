import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';
import { AlertService } from 'src/app/services/Myalert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';
import { Kategori } from 'src/app/models/Kategori';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-urun',
  templateUrl: './admin-urun.component.html',
  styleUrls: ['./admin-urun.component.css']
})
export class AdminUrunComponent implements OnInit {
  urunler: Urun[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  UyeId: number;
  dataSource: any;
  displayedColumns = ['Baslik', 'Tarih','UyeKadi','Goruntulenme','detay'];
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  dialogRef:MatDialogRef<UrunDialogComponent>;
  dialogaRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog : MatDialog,
    public alert : AlertService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.UyeId=parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe(p=>{
      if(p['katId']){
      this.katId = p['katId'];
      this.KategoriById();
      }
    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori) =>{
      this.secKat = d;
      this.UrunListele();
    });
  }

  UrunListele(){
    this.apiServis.UrunListeByKatId(this.katId).subscribe(d=>{
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(katId:number){
    this.katId = katId;
    this.UrunListele();
  }

  Ekle(){
    var yeniKayit: Urun = new Urun();
    this.dialogRef= this.matDialog.open(UrunDialogComponent,{
      width: '800px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      yeniKayit= d;
      yeniKayit.Foto = "foto.jpg";
      yeniKayit.Tarih = new Date();
      yeniKayit.Goruntulenme= 0;
      yeniKayit.UyeId=this.UyeId;
      this.apiServis.UrunEkle(yeniKayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UrunListele();
        }
      });
    }
    });
  }

  Duzenle(kayit:Urun){
    this.dialogRef= this.matDialog.open(UrunDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      kayit.KategoriAdi =d.KategoriAdi;
      this.apiServis.UrunDuzenle(kayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UrunListele();
        }
      });
    }
    });
  }

  Detay(kayit:Urun){
    this.dialogRef= this.matDialog.open(UrunDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'detay'
      }
    });
  }

  Sil(kayit:Urun){
    this.dialogaRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width: '400px',
    });
    this.dialogaRefConfirm.componentInstance.dialogMesaj=kayit.Baslik + " Başlıklı ürün silinecektir onaylıyor musunuz?";
    this.dialogaRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.UrunSil(kayit.UrunId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UrunListele();
          }
        });
      }
    });
  }
}

