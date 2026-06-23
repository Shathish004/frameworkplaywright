

export class APILogger 
{

    private recentLogs: any[] =[]
    logrequest(method:string, url:string,headers:Record<string,string>, body?:any)
    {
        const logentry = {method,url,headers,body}
        this.recentLogs.push({type: 'Request Details', data:logentry})
    }

    logresponse(statuscode:Number,body?:any)
    {
        const logentry = {statuscode,body}
        this.recentLogs.push({type: 'Response Details', data:logentry})
    }

   getRescentLogs()
{
    return this.recentLogs
        .map(log => {
            return `==${log.type}==\n${JSON.stringify(log.data, null, 4)}`;
        })
        .join('\n\n');
}

}