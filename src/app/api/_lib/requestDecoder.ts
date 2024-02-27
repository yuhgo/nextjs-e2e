export const getObjectFromRequestBodyStream = async <ResponseType>(body: Request["body"]): Promise<ResponseType> => {
	const input = await body?.getReader().read();
	const decoder = new TextDecoder();
	const string = decoder.decode(input?.value);
	return JSON.parse(string);
};
