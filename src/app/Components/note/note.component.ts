import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Services/notes/notes.service';

@Component({
  selector: 'Create-Note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  dispNote = false;
  description :string= ''
  title:string='';
  NotesForm!:FormGroup;
  constructor(
    private userservice: UserService,
    private noteservice: NotesService,
    private snackBar :MatSnackBar) {
    }
  ngOnInit(): void {
    this.NotesForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }
  createNote(){
    if(this.NotesForm.value.title != '' || this.NotesForm.value.Desc!= ''){
      this.noteservice.CreateNote(this.NotesForm.value).
      subscribe((result:any)=>{
        console.log(result);
        if(result.status == true){
            this.snackBar.open(result.message,'',{duration:3000});
        }
      })
    }
  }
  autogrow(){
    var textArea = document.getElementById("notes")!      
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  checkMenu(event:any){
      return event.target.value;
  }
}
