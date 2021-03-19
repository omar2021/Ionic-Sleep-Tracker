import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  sleepinessArray:StanfordSleepinessData[];
  isVisible:boolean;

  constructor(private sleepservice:SleepService, private navCtrl:NavController) { }

  async getData(){
		const getFromstorage = await Storage.get({key: 'sleepdata'});
		// console.log('getData() console no PARSE %% ' + getFromstorage.value);

		// console.log('getData() console Parse ***' + JSON.parse(getFromstorage.value));
		
		JSON.parse(getFromstorage.value).forEach( (element) => 
		{
			var thetime = new Date(element.loggedAt);
			var theNumber = parseInt(element.loggedValue);

			SleepService.AllSleepinessData.push(new StanfordSleepinessData(theNumber, thetime));
		})
	}

  ngOnInit() {
    if(SleepService.AllSleepinessData.length == 0)
    {
      this.getData();
    }
    this.sleepinessArray = SleepService.AllSleepinessData;
    this.isVisible = false;
  }

  delete(sleepinessArray){
  }

  goBack(){
    this.navCtrl.back();
  }

}
