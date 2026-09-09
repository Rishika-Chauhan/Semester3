const fs= require('fs');

fs.writeFile('sample.txt', 'Welcome to Full Stack Development', 'utf8', (err) => {
    if (err) {
        console.log('Error creating file: ', err);
        return;
    }

    console.log('file created successfully');

    //read
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file: ', err);
            return;
        }

        console.log('File Content:');
        console.log(data);

    //append
        fs.appendFile('sample.txt', '\nSemester 3', 'utf8', (err) => {
            if (err) {
                console.log('Error updating file: ', err);
                return;
            }

            console.log('\nfile updated successfully');


        //updated read
            fs.readFile('sample.txt', 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading file: ', err);
                    return;
                }

                console.log('Updated File Content:');
                console.log(data);

            //delete
                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file: ', err);
                    }
                    else{
                            console.log('\n4. file deleting successfully')
                        }
                 });

            });
        });
    });
});