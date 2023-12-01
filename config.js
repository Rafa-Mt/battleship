export const boardConfig = {
    "bg-color": "#5FBDFF",
    "layer": "boardBackground",
    "size": {
        "vertical": 10,
        "horizontal": 10
    },
    "ship-templates": [
        {
            "name": "Carrier",
            "amount": 1,
            "lenght": 5
        }, 
        {
            "name": "Battleship",
            "amount": 1,
            "lenght": 4
        }, 
        {
            "name": "Cruiser",
            "amount": 2,
            "lenght": 3
        }, 
        {
            "name": "Destroyer",
            "amount": 1,
            "lenght": 2
        }, 
    ]
}

export const tileConfig = {
    "layer": "board",
    "style": {
        "width": 60,
        "height": 60,
        "gap": 5,
        "border-color": "#0a0a0a",
        "bg-color": "#0FA3B1",
        "failed-color": "#4d8b31",
        "shot-color": "#F7B32B",
        "sunk-color": "#C51605",
        "debug-color": "#EDEDED"
    },
}
