import * as moment from "moment/moment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Utils {

  epochStringToDateTime(epoch: string){
    const day = moment.unix(parseInt(epoch)); //seconds
    return day.add(0, "hour").format('YYYY-MM-DD HH:mm:ss');
  }

  stringToFloat(text: string) {
    return parseFloat(text);
  }

}
