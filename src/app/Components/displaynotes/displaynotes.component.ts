import { COMPILER_OPTIONS, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  sentmsg: any;
  pin: boolean = true;
  @Input() childMessage: any;


  @Output() noteUpdated = new EventEmitter<any>()
  @Output() displaytogetallnotes = new EventEmitter<string>();
  constructor(private note: NotesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }
  openDialog(note: any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '550px',
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
      this._snackBar.open('Note Pinned', '', {
        duration: 3000,
        verticalPosition: 'bottom',
      })
    })
  }

  recievefromiconstodisplaycard($event: any) {
    console.log("recievedindisplay");
    this.sentmsg = $event
    this.displaytogetallnotes.emit(this.sentmsg)

  }

}
