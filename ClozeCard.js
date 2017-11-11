function ClozeCard(text,cloze) {

	//Test to make sure provided constructors are valid
	if (text.indexOf(cloze) >= 0) {

		//Making constructor scope-safe
		if (!(this instanceof ClozeCard)) {
			return new ClozeCard(text, Cloze);
		}
		this.fulltext = text;
		this.cloze = cloze;
		this.partial = this.fulltext.replace(cloze,"...");
	}	
	else
		console.log('Unable to generate ClozeCard, cloze text not present in full text.'); 
}

module.exports = ClozeCard;