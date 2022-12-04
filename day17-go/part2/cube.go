package main

type Cube struct {
	active          bool
	coord           Coord
	NeighbourCoords []Coord
}

func Default(coord Coord) *Cube {
	return New(coord, false)
}

func New(coord Coord, active bool) *Cube {
	neighbourCoords := coord.ComputeNeighbourCoords()

	return &Cube{
		active:          active,
		coord:           coord,
		NeighbourCoords: neighbourCoords,
	}
}

func (c *Cube) Hash() string {
	return c.coord.Hash()
}

func (c *Cube) Toggle() {
	c.active = !c.active
}

func (c *Cube) IsActive() bool {
	return c.active
}

func (c *Cube) Enable() {
	c.active = true
}

func (c *Cube) Disable() {
	c.active = false
}

func (c *Cube) String() string {
	if c.active {
		return "#"
	}
	return "."
}
