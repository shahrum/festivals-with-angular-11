import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "capitalizeEachWord"
})
export class CapitalizeEachWordPipe implements PipeTransform {
	transform(value: string): any {
		return value
		.toLowerCase()
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
	}
}