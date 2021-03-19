import { SleepData } from './sleep-data';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;
  private newHour:number;
  private newMinutes:number;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
    //console.log('aaaaa');
		this.sleepStart= sleepStart;
		this.sleepEnd = sleepEnd;
	}

	summaryString():string {
    //console.log('bbbb');
    var newSleepStart = new Date(this.sleepStart);
    var newSleepEnd = new Date(this.sleepEnd);

    var sleepStart_ms = newSleepStart.getTime();
    var sleepEnd_ms = newSleepEnd.getTime();

		//var sleepStart_ms = this.sleepStart.getTime();
		//var sleepEnd_ms = this.sleepEnd.getTime();



		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		// Convert to hours and minutes
		//return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
    this.newHour = Math.floor(difference_ms / (1000*60*60));
    this.newMinutes = Math.floor(difference_ms / (1000*60) % 60);

	

    return this.newHour + " Hrs " + this.newMinutes + " Min ";
	}

	async getItem() {
		const producting = await Storage.get({  key:  "something_new" });
		console.log('something new: ' + producting.value)
	}

	dateString():string {
		//this.getItem();
    	var newSleepStart = new Date(this.sleepStart);
		return "Night of " + newSleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
		//return producting.value;
	}
}
