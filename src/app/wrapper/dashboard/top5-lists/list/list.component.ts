import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  @Input() title:String="";
  @Input() isGain:boolean = false;
  @Input() top5list:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
