import { Component, OnInit } from '@angular/core';
import { NominasService } from 'src/app/shared/nominas.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  private fileTmp: any;

  constructor(private nominasService:NominasService) { }

  ngOnInit(): void {
  }

  onUpload(){
    const body = new FormData;
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    
    this.nominasService.sendPost(body).subscribe((data:any)=>{
      console.log(data);
      
    })
    // let formData = new FormData();
    // for(let i=0; i < this.uploadedFiles.length; i++){
    //   formData.append("uploads[]",this.uploadedFiles[i], this.uploadedFiles[i].name);
    // }
    // //LLamar a nuestro servicio.
    // this.nominasService.uploadFile(formData).subscribe((data:any)=>{
    //   console.log("Response:" + data);
      
    // })
  }

  onFileChange($event:any){
  const [file] = $event.target.files;
  this.fileTmp ={
    fileRaw: file,
    fileName: file.name
  }
  
    
  }

}
