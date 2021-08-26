// deklaracje zmiennych

// cachowanie DOM
const new_book_button = document.getElementById("new_book_button");
const books_table = document.getElementById("books_table");
const display_books_button = document.getElementById("display_books_button");
display_books_button.classList.add("display_books_button_class");
const body_element = document.querySelector("body");

// deklaracja obiektu book
function Book(_title, _author, _pages, _read, _rating) {
	this.title = _title || "Default title";
	this.author = _author || "Default author";
	this.pages = _pages || "Default pages count";
	this.read = _read || "Default read status";
	this.rating = _rating || "Default rating";
	this.printInfo = () => {
		return `<span>Title: </span>${this.title} <br><span>Author: </span> ${this.author}<br><span>Pages count: </span>${this.pages} 
        <br><span>Book status: </span>${this.read}<br><span>Book rating: </span>${this.rating}<br>`;
	};
}

const popup_submit_button = document.createElement("button");

function createNewBookPanel() {
	const main_div = document.createElement("div");
	main_div.classList.add("newBookPanel");
	const popup = document.createElement("div");
	popup.classList.add("popup");

	main_div.addEventListener(
		"click",
		(e) => {
			if (e.target === main_div) body_element.removeChild(main_div);
			// else console.log("nmie");
		},
		false
	);

	const popup_title_of_div = document.createElement("h2");
	popup_title_of_div.innerText = "Add new book";
	popup_title_of_div.classList.add("popup_title_of_div");
	popup.appendChild(popup_title_of_div);

	const popup_title_input = document.createElement("input");
	popup_title_input.type = "text";
	popup_title_input.placeholder = "Title";
	popup_title_input.id = "title";
	popup_title_input.classList.add("popup_input_text");
	popup.appendChild(popup_title_input);

	const popup_author_input = document.createElement("input");
	popup_author_input.type = "text";
	popup_author_input.placeholder = "Author";
	popup_author_input.id = "author";
	popup_author_input.classList.add("popup_input_text");
	popup.appendChild(popup_author_input);

	const popup_pages_input = document.createElement("input");
	const popup_pages_br = document.createElement("br");
	const popup_pages_span = document.createElement("span");
	popup_pages_span.innerText = "Pages: ";
	popup_pages_input.type = "number";
	popup_pages_input.placeholder = "Pages";
	popup_pages_input.classList.add("popup_input_number");
	popup_pages_input.step = 1;
	popup_pages_input.id = "pages";
	popup.appendChild(popup_pages_br);
	popup.appendChild(popup_pages_span);
	popup.appendChild(popup_pages_input);

	const popup_read_input = document.createElement("input");
	const popup_read_br = document.createElement("br");
	const popup_read_span = document.createElement("span");
	popup_read_span.innerText = "Read: ";
	popup_read_input.type = "number";
	popup_read_input.placeholder = "Read";
	popup_read_input.classList.add("popup_input_number");
	popup_read_input.id = "read";
	popup.appendChild(popup_read_br);
	popup.appendChild(popup_read_span);
	popup.appendChild(popup_read_input);

	const popup_rating_input = document.createElement("input");
	const popup_rating_br = document.createElement("br");
	const popup_rating_span = document.createElement("span");
	const popup_rating_unit_span = document.createElement("span");
	popup_rating_unit_span.id = "popup_rating_unit_span";
	popup_rating_unit_span.innerText = "/10";
	popup_rating_span.innerText = "Rating: ";
	popup_rating_input.type = "number";
	popup_rating_input.max = "10.0";
	popup_rating_input.min = "0.0";
	popup_rating_input.step = "0.5";
	popup_rating_input.lang = "en";
	popup_rating_input.classList.add("popup_input_number");
	popup_rating_input.id = "rating";
	popup.appendChild(popup_rating_br);
	popup.appendChild(popup_rating_span);
	popup.appendChild(popup_rating_input);
	popup.appendChild(popup_rating_unit_span);

	popup_submit_button.innerText = "Submit";
	popup_submit_button.id = "popup_submit_button";
	const popup_submit_button_br = document.createElement("br");

	popup.appendChild(popup_submit_button_br);
	popup.appendChild(popup_submit_button);

	main_div.appendChild(popup);
	body_element.appendChild(main_div);
}

function checkInputData(title, author, pages, read) {
	if (title.length <= 0) {
		alert("Title has to be at least one character long");
		return 0;
	} else if (author.length <= 0) {
		alert("Author has to be at least one character long");
		return 0;
	} else if (pages <= 0) {
		alert("Minimum value of pages is 1");
		return 0;
	} else if (read < 0) {
		alert("Minimum value of read is 0");
		return 0;
	} else if (pages > read) {
		alert("Whole book must have equal or more pages then pahes read");
		console.log(pages);
		console.log(read);
		return 0;
	}
	return 1;
}

popup_submit_button.addEventListener("click", () => {
	let isDataCorrect = checkInputData(
		document.getElementById("title").value,
		document.getElementById("author").value,
		document.getElementById("pages").value,
		document.getElementById("read").value
	);

	if (isDataCorrect == 1) {
		let book = new Book(
			document.getElementById("title").value,
			document.getElementById("author").value,
			document.getElementById("pages").value,
			document.getElementById("read").value,
			document.getElementById("rating").value
		);

		myLibrary.push(book);

		const main_div = document.querySelector("div.newBookPanel");
		body_element.removeChild(main_div);

		renewBooks();
	}
});

let _dummyNode;
function destroy(node) {
	if (!_dummyNode) _dummyNode = document.createElement("div");
	_dummyNode.appendChild(node.parentNode.removeChild(node));
	_dummyNode.innerHTML = "";
}

function deleteBook(book_id) {
	const td_being_deleted = document.getElementById("td_nr_" + book_id);
	destroy(td_being_deleted);
	myLibrary.splice(book_id, 1);
	renewBooks();
}

// tworzenie przycisków delete i togglereadStatus
function createDeleteButton(index) {
	const del_button = document.createElement("button");
	del_button.innerText = "Delete a book";
	del_button.type = "button";
	del_button.id = "button_nr_" + index;
	del_button.addEventListener("click", () => deleteBook(index));
	return del_button;
}

function createToggleButtonReadStatus(index) {
	const toggleReadStatus_button = document.createElement("button");
	toggleReadStatus_button.innerText = "Toggle read status";
	toggleReadStatus_button.type = "button";
	toggleReadStatus_button.id = "toggleReadStatus_button" + index;
	toggleReadStatus_button.addEventListener("click", () =>
		toggleReadStatus(index)
	);
	return toggleReadStatus_button;
}

// funkcja wyświetlająca książki
var books_table_tbody_tr;
function displayBooks() {
	if (
		display_books_button.innerText == "DISPLAY BOOKS" &&
		myLibrary.length > 0
	) {
		books_table.innerText = "";
		const books_table_tbody = document.createElement("tbody");
		// let books_table_tbody_tr = document.createElement('tr');

		myLibrary.forEach((item, index) => {
			// tworzy diva z info o książkach
			const books_info_div = document.createElement("div");
			books_info_div.className = "book_info_div";
			books_info_div.innerHTML += `  ${item.printInfo()} `;

			// tworzenie buttonów delete i toggle
			const del_button = createDeleteButton(index);
			const toggleReadStatus_button = createToggleButtonReadStatus(index);

			// tworzy diva na przyciski del i toggle
			const buttons_div = document.createElement("div");
			buttons_div.className = "buttons_div";

			buttons_div.appendChild(del_button);
			buttons_div.appendChild(toggleReadStatus_button);

			// tworzy komówrki tabeli (puste)
			let table_cells = document.createElement("td");
			table_cells.id = "td_nr_" + index;

			table_cells.appendChild(buttons_div);
			table_cells.appendChild(books_info_div);
			// tworzenie wierszy
			if (index % 5 == 0) {
				// console.log("dupa");
				books_table_tbody_tr = document.createElement("tr");
			}

			books_table_tbody_tr.appendChild(table_cells);
			books_table_tbody.appendChild(books_table_tbody_tr);
			books_table.appendChild(books_table_tbody);
			// books_table.classList.toggle("hidden")
			display_books_button.classList.remove("display_books_button_class");
			display_books_button.classList.add("hide_books_button_class");
		});
		localStorage.setItem("myLibraryLocalCopy", JSON.stringify(myLibrary));
		display_books_button.innerText = "HIDE BOOKS";
	} else if (display_books_button.innerText == "HIDE BOOKS") {
		books_table.innerText = "";
		display_books_button.innerText = "DISPLAY BOOKS";
		display_books_button.classList.add("display_books_button_class");
		display_books_button.classList.remove("hide_books_button_class");
	} else if (myLibrary.length == 0) {
		alert(
			"You have no books in your library, use 'NEW BOOK' button to add books."
		);
	}
}

function renewBooks() {
	books_table.innerText = "";
	const books_table_tbody = document.createElement("tbody");
	// let books_table_tbody_tr = document.createElement('tr');

	myLibrary.forEach((item, index) => {
		// tworzy diva z info o książkach
		const books_info_div = document.createElement("div");
		books_info_div.className = "book_info_div";
		books_info_div.innerHTML += `  ${item.printInfo()} `;

		// tworzenie buttonów delete i toggle
		const del_button = createDeleteButton(index);
		const toggleReadStatus_button = createToggleButtonReadStatus(index);

		// tworzy diva na przyciski del i toggle
		const buttons_div = document.createElement("div");
		buttons_div.className = "buttons_div";

		buttons_div.appendChild(del_button);
		buttons_div.appendChild(toggleReadStatus_button);

		// tworzy komówrki tabeli (puste)
		let table_cells = document.createElement("td");
		table_cells.id = "td_nr_" + index;

		table_cells.appendChild(buttons_div);
		table_cells.appendChild(books_info_div);
		// tworzenie wierszy
		if (index % 5 == 0) {
			// console.log("dupa");
			books_table_tbody_tr = document.createElement("tr");
		}

		books_table_tbody_tr.appendChild(table_cells);
		books_table_tbody.appendChild(books_table_tbody_tr);
		books_table.appendChild(books_table_tbody);
		// books_table.classList.toggle("hidden")
		display_books_button.classList.remove("display_books_button_class");
		display_books_button.classList.add("hide_books_button_class");
	});
	localStorage.setItem("myLibraryLocalCopy", JSON.stringify(myLibrary));
	display_books_button.innerText = "HIDE BOOKS";
}

function toggleReadStatus(book_id) {
	if (myLibrary[book_id].read.toLowerCase() == "read") {
		myLibrary[book_id].read = "not read";
	} else {
		myLibrary[book_id].read = "read";
	}
	renewBooks();
}

// lokalne odczytywanie
let myLibraryRaw = JSON.parse(localStorage.getItem("myLibraryLocalCopy"));
if (myLibraryRaw == null) {
	myLibraryRaw = [];
}
const myLibrary = [];

myLibraryRaw.forEach((item, index) => {
	myLibrary[index] = new Book(
		item.title,
		item.author,
		item.pages,
		item.read,
		item.rating
	);
});

// event listenery
new_book_button.addEventListener("click", createNewBookPanel);
display_books_button.addEventListener("click", displayBooks);
