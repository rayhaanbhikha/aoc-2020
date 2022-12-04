package main

import (
	"strconv"
	"strings"
)

var defaultNeighbourCoords = func() []Coord {
	coords := make([]Coord, 0)
	for x := -1; x <= 1; x++ {
		for y := -1; y <= 1; y++ {
			for z := -1; z <= 1; z++ {
				if x == 0 && y == 0 && z == 0 {
					continue
				}
				coords = append(coords, NewCoord(x, y, z))
			}
		}
	}
	return coords
}()

type Coord [3]int

func NewCoord(x, y, z int) Coord {
	return Coord{x, y, z}
}

func FromHash(hash string) Coord {
	res := strings.Split(hash, ".")
	newCoord := Coord{}
	for i, re := range res {
		x, err := strconv.Atoi(re)
		if err != nil {
			panic(err)
		}
		newCoord[i] = x
	}
	return newCoord
}

func (c Coord) ComputeNeighbourCoords() []Coord {
	neighbourCoords := make([]Coord, 0, len(defaultNeighbourCoords))
	for _, neighbourCoord := range defaultNeighbourCoords {
		newCoord := c.Add(neighbourCoord)
		neighbourCoords = append(neighbourCoords, newCoord)
	}
	return neighbourCoords
}

func (c Coord) Add(otherCoord Coord) Coord {
	newCoord := Coord{}
	for i, oc := range otherCoord {
		newCoord[i] = oc + c[i]
	}
	return newCoord
}

func (c Coord) Hash() string {
	res := ""
	for _, i := range c {
		res += strconv.Itoa(i) + "."
	}
	return res
}

func (c Coord) String() string {
	return c.Hash()
}
