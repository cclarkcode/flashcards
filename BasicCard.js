

function BasicCard (front, back) {

	//Making constructor scope-safe
	if (!(this instanceof BasicCard)) {
		return new BasicCard(front, back);
	}
	this.front=front;
	this.back=back;

}

module.exports = BasicCard;

