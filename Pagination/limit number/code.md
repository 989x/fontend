### How to limit the number of pages shown in pagination in React?
- stackoverflow: https://stackoverflow.com/questions/66169637/how-to-limit-the-number-of-pages-shown-in-pagination-in-react

### I had the same problems and I resolved them with this algorithm :
```
     handleClick(event) {
            this.TotalPage();
            this.setState({
                currentPage: Number(event.target.id)
            });
        }

 const pageNumbers = 10;
 ShowPaginationNumbers(pageNumbers) {

    let paginationNumbers = [];

    if (pageNumbers) {
        let showMax = 3;
        let endPage;
        let startPage;

        if (pageNumbers <= showMax) {
            startPage = 1;
            endPage = pageNumbers.length;
        }
        else {
            startPage = this.state.currentPage;
            if (startPage != pageNumbers.length && (startPage + 1) != pageNumbers.length) {
                endPage = this.state.currentPage + showMax - 1;
            }
            else {
                endPage = pageNumbers.length;
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationNumbers.push(i);
        }
        return this.ShowRenderPageNumbers(paginationNumbers); 
```