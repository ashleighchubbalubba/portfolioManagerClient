import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top5-lists',
  templateUrl: './top5-lists.component.html',
  styleUrls: ['./top5-lists.component.css']
})
export class Top5ListsComponent implements OnInit {

  constructor() { }

  gain = "Top 5 Gainers";
  loss = "Top 5 Losers";
  ngOnInit(): void {
  }

}
