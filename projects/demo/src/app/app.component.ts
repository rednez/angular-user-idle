import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  idle!: number;
  timeout!: number;
  ping!: number;

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('User Idle Example App');
  }

  onChangeIdleValue(event: any) {
    const { idle, timeout, ping } = event;
    this.idle = idle || this.idle;
    this.timeout = timeout || this.timeout;
    this.ping = ping || this.ping;
  }
}
