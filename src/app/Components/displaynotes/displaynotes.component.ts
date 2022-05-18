import { COMPILER_OPTIONS, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/dataService/data.service';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  sentmsg: any;

  searchNote = "";
  @Input() childMessage: any;


  @Output() noteUpdated = new EventEmitter<any>()
  @Output() displaytogetallnotes = new EventEmitter<string>();
  constructor(private note: NotesService, public dialog: MatDialog, private _snackBar: MatSnackBar, private data: DataService) { }

  ngOnInit(): void {
    this.data.incomingData.subscribe((res) => {
      console.log("Searching ", res)
      this.searchNote = res;
    })

  }
  openDialog(note: any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {

      this.noteUpdated.emit(result);
    });
  }

  pinUnPin(note: any) {
    note.pin = !note.pin;
    // console.log(note.pin)
    this.note.pinNote(note.id).subscribe((response: any) => {
      console.log("Note Pinned");
      this.displaytogetallnotes.emit(response);
      this._snackBar.open('Note Pinned', '', {
        duration: 3000,
        verticalPosition: 'bottom',
      })
    })
  }

  iconstodisplaycard($event: any) {
    console.log("recieved and display");
    this.sentmsg = $event
    this.displaytogetallnotes.emit(this.sentmsg)

  }

}
