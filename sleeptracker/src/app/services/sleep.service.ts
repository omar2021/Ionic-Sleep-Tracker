import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
	}

	private addDefaultData() {
		//this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		//this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		//this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	async setData_sleepdata()
	{
		const putInstorage = JSON.stringify(SleepService.AllSleepinessData);
		await Storage.set({
			key: 'sleepdata',
			value: putInstorage
		});
	}
	async setData_overdata(){
		const putInstorage = JSON.stringify(SleepService.AllOvernightData);
		await Storage.set({
			key: 'overdata',
			value: putInstorage
		});
	}

	// async getData(){
	// 	const getFromstorage = await Storage.get({key: 'sleepdata'});
	// 	// console.log('getData() console no PARSE %% ' + getFromstorage.value);

	// 	// console.log('getData() console Parse ***' + JSON.parse(getFromstorage.value));
		
	// 	JSON.parse(getFromstorage.value).forEach( (element) => 
	// 	{
	// 		//console.log('element' + element.loggedAt);
	// 		var thetime = new Date(element.loggedAt);
	// 		//var thetime = element.loggedDate.getTime();
	// 		//var thetime = Date.parse(element.loggedDate);
	// 		var theNumber = parseInt(element.loggedValue);

	// 		// console.log('logged value '  + theNumber);
	// 		// console.log('logged date ' + thetime);
	// 		SleepService.AllSleepinessData.push(new StanfordSleepinessData(theNumber, thetime));
	// 	})
	// }

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);

		this.setData_overdata();

	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		//this.getData();
		//console.log('sleep.service.ts sleepdata: $$ ' + SleepService.AllSleepinessData);
		//console.log('sleepdataaaa ' + sleepData.loggedAt);
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);

		this.setData_sleepdata();
	}

  public getAllSleepinessData(){
    // console.log('all sleepiness data /service/sleep.service.ts');
    // console.log(SleepService.AllSleepinessData);
  }
}
