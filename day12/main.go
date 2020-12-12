package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"
	"time"
)

// Coord ...
type Coord struct {
	x int
	y int
}

// Ship ...
type Ship struct {
	currentDirection rune
	currentAngle     int
	coords           Coord
}

// Code ...
type Code struct {
	direction rune
	value     int
}

// NewShip ...
func NewShip() *Ship {
	return &Ship{currentDirection: 'E', currentAngle: 0}
}

func (s Ship) manHattan() float64 {
	return math.Abs(float64(s.coords.x)) + math.Abs(float64(s.coords.y))
}

func (s *Ship) move(direction rune, value int) {
	switch direction {
	case 'N':
		s.coords.y += value
		return
	case 'S':
		s.coords.y -= value
		return
	case 'E':
		s.coords.x += value
		return
	case 'W':
		s.coords.x -= value
		return
	case 'F':
		s.move(s.currentDirection, value)
		return
	case 'L':
		s.rotate(value)
		return
	case 'R':
		s.rotate(360 - value)
		return
	}
}

func (s *Ship) rotate(value int) {
	newAngle := (s.currentAngle + value) % 360
	s.currentAngle = newAngle
	switch newAngle {
	case 0:
		s.currentDirection = 'E'
		return
	case 90:
		s.currentDirection = 'N'
		return
	case 180:
		s.currentDirection = 'W'
		return
	case 270:
		s.currentDirection = 'S'
		return
	}
}

func main() {
	start := time.Now()
	ship := NewShip()

	content, err := ioutil.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}

	instructions := strings.Split(string(content), "\n")

	for _, instruction := range instructions {
		if instruction != "" {
			val, _ := strconv.Atoi(instruction[1:])
			ship.move(rune(instruction[0]), val)
		}
	}

	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("elapsed: ", elapsed)
	fmt.Println(ship.manHattan())
}
