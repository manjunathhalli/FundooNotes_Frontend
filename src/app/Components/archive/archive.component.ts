import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/notes/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  archiveList: any;
  //id:any;
  constructor(public dialog: MatDialog, private noteService: NotesService) { }

  ngOnInit(): void {
    this.getArchiveList();
  }
  getArchiveList() {
    this.noteService.getAllNotes().subscribe((res: any) => {
      console.log(res);
      this.archiveList = res[0];
      this.archiveList = res[0].filter((object: any) => {
        return object.archive === 1;
      })
      console.log(this.archiveList);
    })

  }

  receiveMessagefromdisplaycard($event: any) {
    console.log("inside get all notes", $event);
    this.getArchiveList();

  }

}
