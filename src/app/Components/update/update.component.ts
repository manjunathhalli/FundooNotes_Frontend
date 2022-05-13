import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/notes/notes.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Output() noteUpdated = new EventEmitter<any>();
  title: any
  description: any
  id: any
  constructor(private noteService: NotesService, public dialogRef: MatDialogRef<UpdateComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(data);
    this.title = data.title
    this.description = data.description
    this.id = data.id
  }

  ngOnInit(): void {
  }
  onClose() {
    let reqData = {
      id: this.id,
      title: this.title,
      description: this.description,
    }
    console.log('updated', reqData, this.id);

    this.noteService.updateNote(reqData, this.id).subscribe((res: any) => {
      console.log(res);
      this.title = ''
      this.description = ''
      this.noteUpdated.emit(res);

    })
    this.dialogRef.close()
  }
}
