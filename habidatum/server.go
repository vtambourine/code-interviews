package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

type Trip struct {
	TripDuration          int     `json:"tripDuration"`
	StartTime             string  `json:"startTime"`
	StopTime              string  `json:"stopTime"`
	StartStationId        int     `json:"startStationId"`
	StartStationName      string  `json:"startStationName"`
	StartStationLatitude  float64 `json:"startStationLatitude"`
	StartStationLongitude float64 `json:"startStationLongitude"`
	EndStationId          int     `json:"endStationId"`
	EndStationName        string  `json:"endStationName"`
	EndStationLatitude    float64 `json:"endStationLatitude"`
	EndStationLongitude   float64 `json:"endStationLongitude"`
}

var trips []Trip

func main() {
	csvFile, err := os.Open(os.Args[1])

	if err != nil {
		log.Fatal(err)
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))

	for {
		line, err := reader.Read()

		if err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}

		t := Trip{}
		t.TripDuration, _ = strconv.Atoi(line[0])
		t.StartTime = line[1]
		t.StopTime = line[2]
		t.StartStationId, _ = strconv.Atoi(line[3])
		t.StartStationName = line[4]
		t.StartStationLatitude, _ = strconv.ParseFloat(line[5], 64)
		t.StartStationLongitude, _ = strconv.ParseFloat(line[6], 64)
		t.EndStationId, _ = strconv.Atoi(line[7])
		t.EndStationName = line[8]
		t.EndStationLatitude, _ = strconv.ParseFloat(line[9], 64)
		t.EndStationLongitude, _ = strconv.ParseFloat(line[10], 64)

		trips = append(trips, t)
	}

	http.HandleFunc("/", handler)

	log.Fatal(http.ListenAndServe(":3001", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	sizeParam := r.URL.Query().Get("size")

	var size int
	var err error
	if size, err = strconv.Atoi(sizeParam); err != nil {
		size = 10
	}

	tripJson, _ := json.Marshal(trips[1 : size+1])

	fmt.Fprint(w, string(tripJson))
}
