export interface Project {
    id: String;
    name: String;
    theme: String;
    description: String;
    city: String;
    address: String;
    startDate: Date;
    endDate: Date;   
    limitPeople: Boolean,
    totalPeople: Number
    status:  Boolean;
    user:  String;
    category: Array<String>;
}