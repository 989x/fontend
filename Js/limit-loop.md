### Limit items in a .map loop
- stackoverflow: https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop

### Default

I would like to ask how can I limit my .map loop for example to a 5 items only because currently when I access an api it returns 20 items. but I want to display only 5. Mostly that I found is just looping all throughout the array of objects and not limiting it to a number of items.

Note: I have no control on the API because I'm just using the moviedb api

Here's my code:

```js
var film = this.props.data.map((item) => {
  return <FilmItem key={item.id} film={item} />
});

return film;
```

### Solve

You could use Array#slice and take only the elements you need.

```js
var film = this.props.data.slice(0, 5).map((item) => {
        return <FilmItem key={item.id} film={item} />
    });

return film;
```

If you do not need the original array anymore, you could mutate the array by setting the length to 5 and iterate them.