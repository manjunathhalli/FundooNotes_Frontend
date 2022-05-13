import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotesService } from 'src/app/Services/notes/notes.service';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  id: any
  colour: any
  @Input() noteObject: any
  @Output() iconstodisplay = new EventEmitter<string>();

  colorarray = ['green',
    'red',
    'blue',
    'yellow',
    'grey',
    'purple',
    'brown',
    'orange',
    'pink',
    'black',
    'silver',
    'teal',
    'white',];

  constructor(private note: NotesService) { }

  ngOnInit(): void {
  }

  onArchive() {
    this.id = [this.noteObject.id]
    console.log(' Note Archived');

    this.note.archiveNotes(this.id).subscribe((res: any) => {
      console.log(res);
      this.iconstodisplay.emit(res)

    })

  }

  onDelete() {
    this.note.deleteNotes(this.noteObject.id).subscribe((response: any) => {
      console.log("Note Delete Successfully", response);
      this.iconstodisplay.emit(response);
      
    })
  }

  setColor(colour: any) {
    console.log(colour)
    this.noteObject.colour = colour
    this.id = this.noteObject.id
    let data = {
      colour: colour
    }
    this.note.ColorNote(this.id, data).subscribe((result: any) => {
      console.log(result);
      this.iconstodisplay.emit(result)

    })
  }
}
