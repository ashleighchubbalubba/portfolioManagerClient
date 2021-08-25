import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acct',
  templateUrl: './acct.component.html',
  styleUrls: ['./acct.component.css']
})
export class AcctComponent implements OnInit {
  @Input() accountType:String="";

  constructor() { }

  ngOnInit(): void {
  }

}
