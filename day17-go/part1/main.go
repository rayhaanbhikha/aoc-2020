package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

type PocketDimension struct {
	cubes map[string]*Cube
}

func (p *PocketDimension) Add(cube *Cube) {
	p.cubes[cube.Hash()] = cube
}

func (p *PocketDimension) Get(coord Coord) (*Cube, bool) {
	val, ok := p.cubes[coord.Hash()]
	return val, ok
}

func (p *PocketDimension) PopulateBoundary() {
	cubesToAdd := make([]*Cube, 0)
	for _, c := range p.cubes {
		for _, neighbourCoord := range c.NeighbourCoords {
			_, ok := p.Get(neighbourCoord)
			if !ok {
				cubesToAdd = append(cubesToAdd, Default(neighbourCoord))
				continue
			}
		}
	}
	for _, c := range cubesToAdd {
		p.Add(c)
	}
}

func (p *PocketDimension) Run() {
	p.PopulateBoundary()

	cubesToChange := make([]*Cube, 0)
	for _, c := range p.cubes {
		neighboursActive := 0
		for _, neighbourCoord := range c.NeighbourCoords {
			neighbourCube, ok := p.Get(neighbourCoord)
			if !ok {
				// can't happen as we populate boundary.
				continue
			}
			if neighbourCube.IsActive() {
				neighboursActive++
			}
		}

		if c.IsActive() {
			if !(neighboursActive == 2 || neighboursActive == 3) {
				// need to deactivate
				cubesToChange = append(cubesToChange, c)
			}
		} else {
			if neighboursActive == 3 {
				//c.Enable()
				cubesToChange = append(cubesToChange, c)
			}
		}
	}

	for _, c := range cubesToChange {
		c.Toggle()
	}
}

func (p *PocketDimension) ActiveCubes() int {
	activeCubes := 0
	for _, c := range p.cubes {
		if c.IsActive() {
			activeCubes++
		}
	}
	return activeCubes
}

func main() {
	data, _ := ioutil.ReadFile("../input")
	inputs := strings.Split(strings.TrimSpace(string(data)), "\n")

	p := &PocketDimension{
		cubes: map[string]*Cube{},
	}

	z := 0
	for x, inputRow := range inputs {
		for y, val := range inputRow {
			active := false
			if string(val) == "#" {
				active = true
			}
			c := New(NewCoord(x, y, z), active)
			p.Add(c)
		}
	}

	for i := 0; i < 6; i++ {
		p.Run()
	}

	fmt.Println(p.ActiveCubes())
}
