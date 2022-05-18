import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'Create-Note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Output() createToGetAllNotes = new EventEmitter<any>()
  takenote!: NgForm;

  public takeNote: boolean = false;

  data :any;

  title: string = "";
  description: string = "";

  constructor(private notesService: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.data ={
    title: this.title,
    description: this.description,
   }

  }

  clickTakeNote() {
    this.takeNote = true
  }

  createNote() {
    this.takeNote = false

    if ((this.title != null && this.title != "") || (this.description != null && this.description != "")) {
      let reqData = {
        title: this.title,
        description: this.description,

      }

      this.notesService.createNote(reqData).subscribe((response: any) => {
        console.log("Note Created successfully", response);
        this.createToGetAllNotes.emit(response.data);
        this.title = "",
        this.description = "";
       // this.createToGetAllNotes.emit(response);

        this._snackBar.open('Note Created successfully', '', {
          duration: 2500,
          verticalPosition: 'bottom'
        })
      });
    }
  }
}
