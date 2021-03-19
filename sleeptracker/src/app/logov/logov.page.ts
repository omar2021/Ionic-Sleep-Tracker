import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { IonicModule, NavController } from '@ionic/angular';
import { OvernightSleepData } from '../data/overnight-sleep-data';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-logov',
  templateUrl: './logov.page.html',
  styleUrls: ['./logov.page.scss'],
})
export class LogovPage implements OnInit {
  overArray:OvernightSleepData[];

  constructor(private sleepservice:SleepService, private navCtrl:NavController) { }

  async getData(){
		const getFromstorage = await Storage.get({key: 'overdata'});
		// console.log('getData() console no PARSE %% ' + getFromstorage.value);

		// console.log('getData() console Parse ***' + JSON.parse(getFromstorage.value));
		
		JSON.parse(getFromstorage.value).forEach( (element) => 
		{
			var the_start = new Date(element.sleepStart);
			var the_end = new Date(element.sleepEnd);

			SleepService.AllOvernightData.push(new OvernightSleepData(the_start, the_end));
		})
	}

  ngOnInit() {

    this.getData();
    this.overArray = SleepService.AllOvernightData;
  }

}
