import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  result: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.result = this.route.snapshot.queryParamMap.get('result');
  }
}