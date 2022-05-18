import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/notes/notes.service';

@Component({
  selector: 'app-getall',
  templateUrl: './getall.component.html',
  styleUrls: ['./getall.component.scss'],
})

export class GetallComponent implements OnInit {
  notelist: any = [];

  noteListUnpinned: any = [];
  constructor(private note: NotesService) { }

  ngOnInit(): void {
    this.getAllNotes()
  }
 
  getAllNotes() {
    this.note.getAllNotes().subscribe((res: any) => {
      console.log(res);
      this.notelist = res[0];
      this.notelist && this.notelist.reverse();
      this.notelist = this.notelist.filter((object: any) => {
        return object.archive === 0 && object.pin === 1;
      })
      this.noteListUnpinned = res[0];
      this.noteListUnpinned && this.noteListUnpinned.reverse();
      this.noteListUnpinned = this.noteListUnpinned.filter((object: any) => {
        return object.archive === 0 && object.pin === 0
      })
      // console.log(this.notelist);
    })
  }
   
  receiveEvent(eventGetAll: any) {

    console.log(eventGetAll);

    // this.notelist && this.notelist.reverse();
    this.notelist.push(eventGetAll); 

    // this.notelist && this.notelist.reverse();
    console.log(this.notelist);


    this.getAllNotes();
    
  }
  updatedData(value: any) {
    this.getAllNotes();
  }

  receiveMessagefromdisplaycard($event: any) {
    console.log("inside get all notes");
    this.getAllNotes()
  }
}



