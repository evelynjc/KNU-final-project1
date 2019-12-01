
//////////
/////////  All Serial Handling Code, 
/////////  It's Changeable with the 'serialVisual' variable
/////////  Set it to 'true' or 'false' when it's declared at start of code.  
/////////

//  Decides How To OutPut BPM and IBI Data
void serialOutputWhenBeatHappens(){    
String dataset;
String jsondata = "";
StaticJsonDocument<200> jsonBuffer;
JsonObject root = jsonBuffer.createNestedObject();

if(softwareSerial.available()>0){
     // dataset  = String(BPM) + "," + String(WindSpeed_MPH) + "," + String(celsiustemp);
     // int test = 123456789;
     // softwareSerial.println(test, HEX);

     root["BPMvalue"] = BPM;
     root["MPHvalue"] = round(WindSpeed_MPH * 10) / 10;
     root["Tempvalue"] = round(celsiustemp * 10) / 10;

     serializeJson(root, jsondata);

     softwareSerial.println(jsondata);
      
      //softwareSerial.println(dataset);
//    softwareSerial.print(BPM);
//    softwareSerial.print(",");
//    softwareSerial.print(WindSpeed_MPH);
//    softwareSerial.print(",");
//    softwareSerial.println(celsiustemp);
//    
//    Serial.print(BPM);
//    Serial.print(",");
//    Serial.print(WindSpeed_MPH);
//    Serial.print(",");
//    Serial.println(celsiustemp);
    }
         Serial.println(jsondata);
    
}

void windsensor() {

  if (millis() - lastMillis > 200){      // read every 200 ms - printing slows this down further    
    TMP_Therm_ADunits = analogRead(analogPinForTMP);
    RV_Wind_ADunits = analogRead(analogPinForRV);
    RV_Wind_Volts = (RV_Wind_ADunits *  0.0048828125);

    // these are all derived from regressions from raw data as such they depend on a lot of experimental factors
    // such as accuracy of temp sensors, and voltage at the actual wind sensor, (wire losses) which were unaccouted for.
    TempCtimes100 = (0.005 *((float)TMP_Therm_ADunits * (float)TMP_Therm_ADunits)) - (16.862 * (float)TMP_Therm_ADunits) + 9075.4;  
    zeroWind_ADunits = -0.0006*((float)TMP_Therm_ADunits * (float)TMP_Therm_ADunits) + 1.0727 * (float)TMP_Therm_ADunits + 47.172;  //  13.0C  553  482.39
    zeroWind_volts = (zeroWind_ADunits * 0.0048828125) - zeroWindAdjustment;  
    
    // This from a regression from data in the form of 
   // Vraw = V0 + b * WindSpeed ^ c
    // V0 is zero wind at a particular temperature
    // The constants b and c were determined by some Excel wrangling with the solver.
   WindSpeed_MPH =  pow(((RV_Wind_Volts - zeroWind_volts) /.2300) , 2.7265);   
  } 
}

void temperature(){
  reading = analogRead(outputpin);  // 센서로 부터 자료값을 받는다.
  voltage = reading * 5.0 / 1024.0;
  celsiustemp = (voltage - 0.5) * 100 ; 
}
